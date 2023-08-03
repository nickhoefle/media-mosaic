import React from 'react';

const newsArticles = (show, articles, newsSourceIndex, newsSources) => {
    if (!show || !newsSources || !newsSources[newsSourceIndex]?.currentData?.items) return null;

    const { currentData, logo } = newsSources[newsSourceIndex];

    return (
        <div>
            {currentData.items.slice(0, articles).map((item, index) => (
                <div key={index} className='newsArticles'>
                    {logo && <img src={logo} className='newsSourceIcon' alt='News Source Icon' />}
                    <a className='newsArticleLink' href={item.link}>{item.title}</a>
                </div>
            ))}
        </div>
    );
};

export default newsArticles;