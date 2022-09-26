export class RequestUtils {
  static toFormData(data) {
    const formData = new FormData()
    for (const [key, value] of this.getKeyValueArray(data)) formData.append(key, value)
    return formData
  }

  static getKeyValueArray(data, keyStart = '') {
    const result = []

    for (const [key, value] of Object.entries(data)) {
      const resultKey = keyStart ? `${keyStart}[${key}]` : key
      if (!(value instanceof File) && value && typeof value === 'object') {
        result.splice(result.length, 0, ...this.getKeyValueArray(value, resultKey))
      } else {
        result.push([resultKey, value])
      }
    }
    return result
  }
}
