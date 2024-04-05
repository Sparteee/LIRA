import { ref } from 'vue'
import Schema from 'async-validator'
export function useForm(options) {
  const formErrors = ref({})
  const form = ref(options.form)
  const validator = new Schema(options.validation)
  const validate = () => {
    formErrors.value = {}
    validator.validate(form.value, (errors, fields) => {
      if (errors) {
        errors.forEach((error) => {
          formErrors.value[error.field] = error.message
        })
        return;
      }
      console.log('Form valide !');
    })
  }
  return { form, formErrors, validate }

}
