import React from 'react';

const newsSourceCheckboxesAndArticleAmounts = (sourceName, checked, onCheckedChange, numArticles, onNumArticlesChange) => {
    
    const handleNumArticlesChange = (newValue) => {
        const maxNumber = 9;
        const validatedValue = Math.min(newValue, maxNumber);
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
                <input
                    type="number"
                    className='amount-of-articles-input'
                    id={`${sourceName}Articles`}
                    value={numArticles}
                    onChange={(e) => handleNumArticlesChange(Number(e.target.value))}
                />
            )}
            <hr />
        </label>
    );
};

export default newsSourceCheckboxesAndArticleAmounts;