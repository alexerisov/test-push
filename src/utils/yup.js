import { addMethod, StringSchema } from 'yup';
import { i18n } from 'next-i18next';

export default function yupSetup() {
  //add custom email validation
  addMethod(StringSchema, 'emailWithoutSymbols', function () {
    return this.email(i18n?.t('errors:field_required.name')).test('test', 'Enter a valid email', function (value) {
      const re =
        /^(([^<>%&+'`"()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    });
  });
}
