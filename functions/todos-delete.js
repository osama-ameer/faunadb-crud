/* Import faunaDB sdk */
const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query


exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: "fnAETAr8UQACTFWS6jfgOzIdgYNHmHf7_lc_wVzE"
  }) 
  const id = getId(event.path)
  console.log(`Function 'todo-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/todos/${id}`)))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}