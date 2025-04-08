import {
   validationSchema as commonValidationSchema,
   jwtValidationSchema,
   githubValidationSchema,
} from '@app/common';

export const validationSchema = commonValidationSchema.keys({
   ...jwtValidationSchema,
   ...githubValidationSchema,
}); 