import React from 'react';

const newsSourceCheckboxesAndArticleAmounts = (sourceName, checked, onCheckedChange, numArticles, onNumArticlesChange) => {
    
    const handleNumArticlesChange = (newValue) => {
        const maxNumber = 9;
        const validatedValue = Math.min(newValue, maxNumber);
        onNumArticlesChange(validatedValue);
    };

    const increaseArticles = () => {
        const newValue = numArticles + 1;
        const maxNumber = 9; // You can adjust this value as needed
        const validatedValue = Math.min(newValue, maxNumber);
        onNumArticlesChange(validatedValue);
    };
    
    const decreaseArticles = () => {
        const newValue = numArticles - 1;
        const minNumber = 1; // You can adjust this value as needed
        const validatedValue = Math.max(newValue, minNumber);
        onNumArticlesChange(validatedValue);
    };
    
    return (
        <label className='source-label' htmlFor={sourceName}>
            <input
                type="checkbox"
                id={sourceName}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
            />
            {sourceName}
            {checked && (
                <>
                    <button className='plus-button' onClick={increaseArticles}>+</button>
                    <button className='minus-button' onClick={decreaseArticles}>-</button>
                    <input
                        type="number"
                        className='amount-of-articles-input'
                        id={`${sourceName}Articles`}
                        value={numArticles}
                        onChange={(e) => handleNumArticlesChange(Number(e.target.value))}
                        min="1"
                    />
                </>
            )}
            <hr />
        </label>
    );
};

export default newsSourceCheckboxesAndArticleAmounts;