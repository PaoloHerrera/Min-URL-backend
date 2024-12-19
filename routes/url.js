import { Router } from 'express'
import UrlController from '../controllers/UrlController.js'
import { validateUrl } from '../middleware/validateUrl.js'
import { limitRequests } from '../middleware/limitRequests.js'
import { verifyRecaptcha } from '../middleware/verifyRecaptcha.js'
import rateLimit from 'express-rate-limit'

const routesUrl = Router()

// Limitador de peticiones
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  trustProxy: false,
  message: 'Too many requests from this IP, please try again after 15 minutes.'
})

routesUrl.use('/', generalLimiter)
routesUrl.post('/', verifyRecaptcha, limitRequests, validateUrl, UrlController.createShortUrl)

export default routesUrl
