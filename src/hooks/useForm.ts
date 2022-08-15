import { Dictionary } from 'models/dictionary.model'
import { useEffect, useState } from 'react'
import { useEffectUpdate } from './useEffectUpdate'

export const useForm = (initialFields: any, cb?: Function, isAsync = false) => {
  const [fields, setFields] = useState(initialFields)

  let asyncFields

  const getAsyncFields = async () => {
    asyncFields = await initialFields
    setFields(asyncFields)
  }

  useEffect(() => {
    if (isAsync) getAsyncFields()
  }, [])

  const handleChange = ({ target }: { target: any }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    if (target.type === 'file') value = target.files[0]
    setFields((prevFields: any) => ({ ...prevFields, [field]: value }))
  }

  const resetFields = () => {
    const emptyFields: Dictionary = {}
    for (let field in fields) {
      emptyFields[field] = ''
    }
    setFields(emptyFields)
  }

  const changeFields = (fields: any) => {
    setFields(fields)
  }

  useEffectUpdate(() => {
    if (cb) cb(fields)
  }, [fields])

  // onChange={handleChange} type="text" id="model" name="model" value={model}
  const register = (
    field: string,
    placeholder: string = '',
    type: string = 'text'
  ) => {
    return {
      onChange: handleChange,
      type,
      id: field,
      name: field,
      value: type === 'file' ? '' : fields[field] || '',
      placeholder,
    }
  }

  return [register, fields, resetFields, changeFields]
}
