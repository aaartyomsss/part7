import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
    let component
    const blog = {
        title: 'some title',
        author: 'some author',
        url: 'dummy',
        likes: 0
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog}/>
        )
    })

    test('Render only title and author', () => {

        const divNotDisplayed = component.container.querySelector('.notDisplayedByDefault')
        expect(divNotDisplayed).toHaveStyle('display: none')
        expect(component.container).toHaveTextContent('some title')
    
    })

    test('Switching button works', () => {
        const mockHandler = jest.fn()
        const button = component.getByText('Show')
        fireEvent.click(button)
        expect(component.container.querySelector('.notDisplayedByDefault'))
            .not.toHaveStyle('display: none')
    })

    test('Like is defined', () => {

        const button = component.getByText('Like')
        expect(button).toBeDefined()
        
    })
})

// describe('Testing like button Functionality', () => {
//     test('Like is clicked twice', async () => {
//         const blog = {
//             title: 'some title',
//             author: 'some author',
//             url: 'dummy',
//             likes: 0
//         }
//         const mockHandler = jest.fn()
//         const component = render(
//             <Blog blog={blog}/>
//         )

        
//         const button = component.getByText('Like')
//         fireEvent.click(button)
//         const button2 = component.getByText('Show')
//         fireEvent.click(button2)
        
        
//     })
// })

