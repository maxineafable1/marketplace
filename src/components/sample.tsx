import React from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from './forms/input';

// Define the Zod schema for the discriminated union
const formSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('typeA'),
    valueA: z.string().min(1, 'Value A is required'),
  }),
  z.object({
    type: z.literal('typeB'),
    valueB: z.number().min(1, 'Value B must be greater than 0'),
  }),
]);

type FormValues = z.infer<typeof formSchema>;
type AType = z.infer<typeof formSchema.options[0]>;

const MyForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const aErrors: FieldErrors<AType> = errors

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  // Watch the type field to determine which fields to display
  const formType = watch('type');


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Select Type:</label>
        <select {...register('type', { required: true })}>
          <option value="">Select Type</option>
          <option value="typeA">Type A</option>
          <option value="typeB">Type B</option>
        </select>
        {errors.type && <span>This field is required</span>}
      </div>

      {formType === 'typeA' && (
        <div>
          <label>Value A:</label>
          {/* <Input<AType> 
            // register={register}
            name='valueA'
            id=''            
          />           */}
          <input type="text" {...register('valueA')} />
          {aErrors.valueA && <span>{aErrors.valueA.message}</span>}
        </div>
      )}

      {formType === 'typeB' && (
        <div>
          <label>Value B:</label>
          <input
            type="number"
            {...register('valueB', { valueAsNumber: true })}
            placeholder="Enter Value B"
          />
          {errors.valueB && <span>{errors.valueB.message}</span>}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
