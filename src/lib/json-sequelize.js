/**
 * @typedef {import('json-schema').JSONSchema4|object} JSONSchema
 * @typedef {import('json-schema').JSONSchema4TypeName} JSONSchemaTypeName
 * @typedef {import('json-schema').JSONSchema4Object} JSONSchemaObject
 * @typedef {import('sequelize').DataType} DataType
 * @typedef {import('sequelize').ModelAttributes} ModelAttributes
 */

 import { default as Sequelize } from 'sequelize'

 /**
  * @const {Symbol} SKIP
  * @description Enables excluding props from the model attributes
  */
 export const SKIP = Symbol('skip')
 /**
  * @const {Symbol} PASS
  * @description Enables processing the schema props after the handler has run
  */
 export const PASS = Symbol('pass')
 
 /**
  * Translate JSON schemas to Sequelize model attributes
  *
  * @param {JSONSchema} schema
  * @param {Mixin|Mixin[]} [mixin]
  * @returns {Response}
  */
 export function sequelizer(schema, mixin) {
   const { properties, required, unique, onetoone } = schema
   /* @type {Mixin[]} */
   const _mixins = mixin ? (Array.isArray(mixin) ? mixin : [mixin]) : undefined
 
   return Object.entries(properties).reduce((obj, [key, property]) => {
     /* @type {ModelAttributes} */
     let attributes = {}
 
     /* @type {Mixin[]} */
     const mixins = _mixins?.filter(({ selector }) => {
       if (!selector) {
         return true
       }
 
       if (typeof selector === 'function') {
         return selector({ key, property, schema })
       } else if (typeof selector === 'string') {
         return selector === key
       } else if (typeof selector === 'object') {
         const [k, v] = Object.entries(selector)[0]
         return key === v || property[k] === v
       }
     }) || [] // prettier-ignore
 
     for (let mixin of mixins) {
       if (!mixin.handler || typeof mixin.handler !== 'function') {
         throw new Error('Mixin is missing "handler" function')
       }
 
       const instructions = mixin.handler({
         schema,
         key,
         property,
         SKIP,
         PASS,
         DataTypes: Sequelize.DataTypes
       })
 
       if (instructions === undefined) {
         throw new Error('"handler" function must return a response')
       }
 
       if (instructions === SKIP) {
         return obj
       }
 
       if (instructions !== PASS) {
         Object.entries(instructions).forEach(([k, v]) => {
           attributes[k] = k === 'type' && typeof v === 'string' ? Sequelize.DataTypes[v] : v
         })
       }
     }
  /* @type DataTypes */
     if (!attributes.type) {
       switch (property.type) {
         case 'string':
           if (property.maxLength){
             attributes.type = Sequelize.DataTypes.STRING(property.maxLength)
           }else{
             attributes.type = Sequelize.DataTypes.STRING
           }
           if (property.enum) {
             attributes.type = Sequelize.ENUM(...property.enum)
           }
           if (property.format) {
             if (property.format === 'date') {
               attributes.type = Sequelize.DataTypes.DATEONLY
             }
             if (property.format === 'date-time') {
               attributes.type = Sequelize.DataTypes.DATE
             }
            
           }
           break
         case 'text':
         attributes.type = Sequelize.DataTypes.TEXT
           break
         case 'tiny':
         attributes.type = Sequelize.DataTypes.TEXT('tiny')
           break
         case 'date-time':
         attributes.type = Sequelize.DataTypes.DATE
           break
         case 'date':
         attributes.type = Sequelize.DataTypes.DATEONLY
           break
         case 'number':
           attributes.type = Sequelize.DataTypes.REAL
           break  
         case 'integer':
           attributes.type = Sequelize.DataTypes.INTEGER
           break
         case 'boolean':
           attributes.type = Sequelize.DataTypes.BOOLEAN
           break
         case 'uuid':
           attributes.type = Sequelize.DataTypes.UUID
           break  
         case 'array':
          attributes.type = Sequelize.DataTypes.JSONB
          break
         case 'object':
           attributes.type = Sequelize.DataTypes.JSONB
           break
          case 'json':
            attributes.type = Sequelize.DataTypes.JSON
            break
          case 'onetoone':
            attributes.type = Sequelize.DataTypes.INTEGER
            break

         default:
           throw new Error(`Unsupported JSON schema value type "${property.type}" for "${key}"`)
       }
     }
 
     if (property.primary) {
       attributes.primaryKey = true
     }
      

     if (property.format === 'email') {
       attributes.validate = {isEmail: true}
     }
 
     if (property.maxLength && property.minLength) {
       attributes.validate = {max: property.maxLength, min: property.minLength}
     }
     if (!property.maxLength && property.minLength) {
       attributes.validate = {min: property.minLength}
     }
 
     if (property.hasOwnProperty('default') && !attributes.hasOwnProperty('defaultValue')) {
       attributes.defaultValue = property.default
     }
 
     if (unique?.includes(key)) {
       attributes.unique = true
     }

 
     if ((Array.isArray(required) ? required : [])?.includes(key)) {
       attributes.allowNull = false
     }

      if (Array.isArray(onetoone) && onetoone.includes(key)) {
        attributes.references = {
          model: key,
          key: 'id'
        }
      }

 
     return { ...obj, [key]: attributes }
   }, {})
 }
 
 /**
  * @typedef {object} Mixin A mixin object for modifying schema props
  * @prop {SelectorString|SelectorObject|SelectorFunction} [selector] Mixin for selecting a target prop in the schema
  * @prop {HandlerFunction} handler Mixin for modifying a target prop in the schema
  */
 
 /**
  * @typedef {string|JSONSchemaTypeName} SelectorString
  *
  * @typedef {JSONSchemaObject} SelectorObject
  *
  * @typedef {function(SelectorArgument): boolean} SelectorFunction
  * @returns {boolean} Requires a truthy response
  *
  * @typedef {object} SelectorArgument
  * @prop {JSONSchema} schema The current schema
  * @prop {string} key The current row key
  * @prop {JSONSchemaObject} property The current row property at schema[key]
  */
 
 /**
  * @typedef {function(HandlerArgument): ModelAttributes|SKIP|PASS|object} HandlerFunction
  * @returns {ModelAttributes|SKIP|PASS|object} Cannot return `undefined`
  *
  * @typedef {object} HandlerArgument
  * @prop {JSONSchema} schema The current schema
  * @prop {string} key The current row key
  * @prop {JSONSchemaObject} property The current row property at schema[key]
  * @prop {Symbol} SKIP The SKIP Symbol (useful for excluding schema props from final attributes)
  * @prop {Symbol} PASS The PASS Symbol (useful for continuing with the default translation)
  * @prop {object} DataTypes The Sequelize.DataTypes object
  */
 
 /**
  * @typedef {Object.<string, ResponseAttributes>} Response
  * @typedef {ModelAttributes|object} ResponseAttributes
  */
 