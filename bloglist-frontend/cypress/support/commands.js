Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    console.log(localStorage.getItem('loggedInUser'))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url,}) => {
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#addBlog').click()
})

Cypress.Commands.add('postBlog', ({ title, author, url, likes, config}) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    headers: {
      Authorization: config
    },
    body: {
      title, author, url, likes
    }, 
  }).then(res => {
    console.log(res)
  })
  cy.visit('http://localhost:3000')

})