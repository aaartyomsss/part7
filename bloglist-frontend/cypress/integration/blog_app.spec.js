const { func } = require("prop-types")


describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'aaartyomsss',
            password: '12345678'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#loginForm').should('exist')
    })

    describe('Login', function () {
        it('Success', function () {
            cy.get('#username').type('aaartyomsss')
            cy.get('#password').type('12345678')
            cy.get('#login-button').click()

            cy.contains('aaartyomsss has loged in!')
        })

        it('Fail', function () {
            cy.get('#username').type('aaartyomsss')
            cy.get('#password').type('1234567')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'aaartyomsss', password: '12345678' })
        })

        it('Note can be posted', function () {
            cy.get('#addNewBlog').click()
            cy.addBlog({ title: 'Dummy text', author: 'Anonym', url: 'none' })
            cy.contains('Dummy text')
        })
    })

    describe('When notes are posted', function () {
        beforeEach(function () {
            cy.login({ username: 'aaartyomsss', password: '12345678' })
            cy.get('#addNewBlog').click()
            cy.addBlog({ title: 'Dummy text', author: 'Anonym', url: 'none' })
            cy.addBlog({ title: 'Another Dummy text', author: 'Anonym', url: 'none' })
            cy.addBlog({ title: 'Last Dummy text', author: 'Anonym', url: 'none' })
        })

        it('Like button is working', function () {
            cy.get('#showHide').click()
            cy.get('#likeButton').click()
            cy.get('.notDisplayedByDefault').contains('Likes: 1')
        })

        it('User can delete a blog', function () {
            cy.get('#showHide').click()
            cy.get('#deleteButton').click()
            cy.on('window:confirm', () => true)

            cy.get('#blogs').find('.singleBlog').should('have.length', 2)
        })

        it('Logged out user cannot delete a blog', function(){
            cy.get('#logoutButton').click()
            cy.get('#showHide').click()
            cy.get('#deleteButton').click()
            cy.on('window:confirm', () => true)

            cy.get('#blogs').find('.singleBlog').should('have.length', 3)
        })

    })

    describe('Notes are sorted', function(){
        beforeEach(function () {
            cy.login({ username: 'aaartyomsss', password: '12345678' })
            console.log(localStorage.getItem('loggedInUser'))
        })

        it('Blogs are sorted in order of likes', function () {
            const body = JSON.parse(localStorage.getItem('loggedInUser'))
            console.log(body)
            const parsed = `bearer ${body.token}`
        
            cy.postBlog({ title: 'Dummy text', author: 'Anonym', url: 'none', likes: 0, config: parsed })
            cy.postBlog({ title: 'Another Dummy text', author: 'Anonym', url: 'none', likes: 2, config: parsed })
            cy.postBlog({ title: 'Last Dummy text', author: 'Anonym', url: 'none', likes: 1, config: parsed })

            const sortedVersion = ['Another Dummy text',
                'Last Dummy text',
                'Dummy text']

            
            cy.get('.blogTitle').eq(0).should('have.text', sortedVersion[0])
            cy.wait(300)
            cy.get('.blogTitle').eq(1).should('have.text', sortedVersion[1])
            cy.wait(300)
            cy.get('.blogTitle').eq(2).should('have.text', sortedVersion[2])
        })
    })


})