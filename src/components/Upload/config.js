import '@/assets/crypto1/crypto/crypto.js'
import '@/assets/crypto1/hmac/hmac.js'
import '@/assets/crypto1/sha1/sha1.js'

const accesskey = 'k6DqH7zUE0JFyjuroCasU2dIDI1Fxl'
const policyText = {
  expiration: '2020-01-01T12:00:00.000Z',
  conditions: [['content-length-range', 0, 2048000]]
}
export const policyBase64 = btoa(JSON.stringify(policyText))
const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
  asBytes: true
})
export const signature = Crypto.util.bytesToBase64(bytes)
export const host = 'http://2018-9-16-image.oss-cn-beijing.aliyuncs.com'
export const OSSAccessKeyId = 'LTAIceTyFAv3wFbS'
