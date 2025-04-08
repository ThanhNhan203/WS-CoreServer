import {
   validationSchema as commonValidationSchema,
   jwtValidationSchema,
} from '@app/common';

export const validationSchema = commonValidationSchema.keys({
   ...jwtValidationSchema,
}); 