import React from 'react';
import { render } from '@testing-library/react';
import GameCard from './GameCard';

describe('GameCard Test', () => {
    const mockGameInformation = {
        name: 'nameTest',
        description: 'describeTest',
        categories: ['categoriesTest1', 'categoriesTest2', 'categoriesTest3'],
        image: 'imageTest',
        href: 'hrefTest'
    }

    test('Expects Card element to be generated correctly', () => {
        render(<GameCard {...mockGameInformation}></GameCard>);
        const cardImgSrc = document.querySelector('.col .card img');
        const cardTitle = document.querySelector('.col .card .card-title');
        const cardCategories = document.querySelectorAll('.col .card p span');
        const cardDescription = document.querySelector('.col .card .card-text');
        const cardAnchor = document.querySelector('.col .card a');

        expect(cardImgSrc?.getAttribute('src')).toEqual(mockGameInformation.image);
        expect(cardTitle?.textContent).toEqual(mockGameInformation.name);
        expect(cardCategories.length).toEqual(3);
        expect(cardDescription?.textContent).toEqual(mockGameInformation.description);
        expect(cardAnchor?.getAttribute('href')).toEqual(mockGameInformation.href);
    });
})


