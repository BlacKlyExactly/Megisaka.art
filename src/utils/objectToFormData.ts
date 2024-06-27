'use client';

const objectToFormData = (object: Object) =>
  Object.entries(object).reduce((formData, [key, value]) => {
    if (value instanceof FileList) {
      for (const file of value) {
        formData.append(key, file);
      }

      return formData;
    }

    formData.append(key, value);
    return formData;
  }, new FormData());

export default objectToFormData;
