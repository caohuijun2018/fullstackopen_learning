import React from 'react'
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('render Blog', () => {
    const blog = {
        title: 'Doubt is the key to knowledge.',
        author: 'huijun'
    }
    
    const component = render(
        <Blog blog = {blog}/>
    )
    
    expect(component.container).toHaveTextContent(
        'Doubt is the key to knowledge.'
    )
})



