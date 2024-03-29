import React, { useState, useEffect } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import newsSources from '../newsSources';
import newsSourceCheckboxesAndArticleAmounts from '../HelperFunctions/newsSourceCheckboxesAndArticleAmounts.js';
import newsArticles from '../HelperFunctions/newsArticles';
import UserAuth from './UserAuth';

import { API_KEY_1_RSS2JSON, API_KEY_2_RSS2JSON } from '../apiKeys';

const NewsFeed = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRSSDataFetched, setIsRSSDataFetched] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

    const [showDemocracyNow, setShowDemocracyNow] = useState(true);
    const [democracyNowArticles, setDemocracyNowArticles] = useState(3);
    const [showNewYorkTimes, setShowNewYorkTimes] = useState(true);
    const [newYorkTimesArticles, setNewYorkTimesArticles] = useState(3)
    const [showDailyMail, setShowDailyMail] = useState(false);
    const [dailyMailArticles, setDailyMailArticles] = useState(3);
    const [showTheHill, setShowTheHill] = useState(true);
    const [theHillArticles, setTheHillArticles] = useState(3);
    const [showDailyBeast, setShowDailyBeast] = useState(true);
    const [dailyBeastArticles, setDailyBeastArticles] = useState(3);
    const [showAxios, setShowAxios] = useState(true);
    const [axiosArticles, setAxiosArticles] = useState(3);
    const [showNewYorker, setShowNewYorker] = useState(false);
    const [newYorkerArticles, setNewYorkerArticles] = useState(3);
    const [showNewsweek, setShowNewsweek] = useState(false);
    const [newsweekArticles, setNewsweekArticles] = useState(3);
    const [showTheDispatch, setShowTheDispatch] = useState(true);
    const [theDispatchArticles, setTheDispatchArticles] = useState(3);
    const [showTheBlaze, setShowTheBlaze] = useState(true);
    const [theBlazeArticles, setTheBlazeArticles] = useState(3);
    const [showBreitbart, setShowBreitbart] = useState(false);
    const [brietbartAritcles, setBreitbartArticles] = useState(3);
    const [showTheFederalist, setShowTheFederalist] = useState(false);
    const [theFederalistArticles, setTheFederalistArticles] = useState(3);
    const [showOneAmericaNews, setShowOneAmericaNews] = useState(false);
    const [oneAmericaNewsArticles, setOneAmericaNewsArticles] = useState(3);
    const [showWashingtonFreeBeacon, setShowWashingtonFreeBeacon] = useState(true);
    const [washingtonFreeBeaconArticles, setWashingtonFreeBeaconArticles] = useState(3);
    const [showNationalReview, setShowNationalReview] = useState(true);
    const [nationalReviewArticles, setNationalReviewArticles] = useState(3);
    const [showReason, setShowReason] = useState(true);
    const [reasonArticles, setReasonArticles] = useState(3);
    const [showSkyNews, setShowSkyNews] = useState(false);
    const [skyNewsArticles, setSkyNewsArticles] = useState(3);
    const [showSalon, setShowSalon] = useState(false);
    const [salonArticles, setSalonArticles] = useState(3);
    const [showMediaite, setShowMediaite] = useState(false);
    const [mediaiteArticles, setMediaiteArticles] = useState(3);
    const [showDerSpiegel, setShowDerSpiegel] = useState(false);
    const [derSpiegelArticles, setDerSpiegelArticles] = useState(3);
    const [showMarketwatch, setShowMarketwatch]= useState(false);
    const [marketwatchArticles, setMarketwatchArticles] = useState(3);
    const [showJerusalemPost, setShowJerusalemPost] = useState(false);
    const [jerusalemPostArticles, setJerusalemPostArticles] = useState(3);
    const [showRCP, setShowRCP] = useState(true);
    const [rcpArticles, setRCPArticles] = useState(3);
    const [showBostonGlobe, setShowBostonGlobe] = useState(true);
    const [bostonGlobeArticles, setBostonGlobeArticles] = useState(3);
    const [showNYPOST, setShowNYPOST] = useState(false);
    const [NYPOSTArticles, setNYPOSTArticles] = useState(3);
    const [showTheSunUs, setShowTheSunUs] = useState(false);
    const [theSunUsArticles, setTheSunUsArticles] = useState(3);
    const [showRussiaToday, setShowRussiaToday] = useState(false);
    const [russiaTodayArticles, setRussiaTodayArticles] = useState(3);
    const [showNtd, setShowNtd] = useState(false);
    const [ntdArticles, setNtdArticles] = useState(3);
    const [showWsjWorld, setShowWsjWorld] = useState(true);
    const [wsjWorldArticles, setWsjWorldArticles] = useState(3);
    const [showCnbcUs, setShowCnbcUs] = useState(true);
    const [cnbcUsArticles, setCnbcUsArticles] = useState(3);
    const [showFiveThirtyEight, setShowFiveThirtyEight] = useState(false);
    const [fiveThirtyEightArticles, setFiveThirtyEightArticles] = useState(3); 
    const [showVox, setShowVox] = useState(false);
    const [voxArticles, setVoxArticles] = useState(3); 
    const [showWapo, setShowWapo] = useState(true);
    const [wapoArticles, setWapoArticles] = useState(3); 
    const [showSlate, setShowSlate] = useState(false);
    const [slateArticles, setSlateArticles] = useState(3); 
    const [showTheIntercept, setShowTheIntercept] = useState(false);
    const [theInterceptArticles, setTheInterceptArticles] = useState(3); 
    const [showJacobin, setShowJacobin] = useState(false);
    const [jacobinArticles, setJacobinArticles] = useState(3);

    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {  // Listens for user login/logout
            setUser(user);  // Updates the user state above with the received user object
            if (isRSSDataFetched && user) { 
                const settingsRef = firebase.firestore().collection('settings').doc(user.uid); // Fetches the document associated with user's UID
                settingsRef.get().then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        setShowDemocracyNow(data.showDemocracyNow);
                        setDemocracyNowArticles(data.democracyNowArticles);
                        setShowNewYorkTimes(data.showNewYorkTimes);
                        setNewYorkTimesArticles(data.newYorkTimesArticles);
                        setShowDailyMail(data.showDailyMail);
                        setDailyMailArticles(data.dailyMailArticles);
                        setShowTheHill(data.showTheHill);
                        setTheHillArticles(data.theHillArticles);
                        setShowDailyBeast(data.showDailyBeast);
                        setDailyBeastArticles(data.dailyBeastArticles);
                        setShowAxios(data.showAxios);
                        setAxiosArticles(data.axiosArticles);
                        setShowNewYorker(data.showNewYorker);
                        setNewYorkerArticles(data.newYorkerArticles);
                        setShowNewsweek(data.showNewsweek);
                        setNewsweekArticles(data.newsweekArticles);
                        setShowTheDispatch(data.showTheDispatch);
                        setTheDispatchArticles(data.theDispatchArticles); 
                        setShowTheBlaze(data.showTheBlaze);
                        setTheBlazeArticles(data.theBlazeArticles);
                        setShowBreitbart(data.showBreitbart);
                        setBreitbartArticles(data.brietbartAritcles);
                        setShowTheFederalist(data.showTheFederalist);
                        setTheFederalistArticles(data.theFederalistArticles);
                        setShowOneAmericaNews(data.showOneAmericaNews);
                        setOneAmericaNewsArticles(data.oneAmericaNewsArticles);
                        setShowWashingtonFreeBeacon(data.showWashingtonFreeBeacon);
                        setWashingtonFreeBeaconArticles(data.washingtonFreeBeaconArticles);
                        setShowNationalReview(data.showNationalReview);
                        setNationalReviewArticles(data.nationalReviewArticles);
                        setShowReason(data.showReason);
                        setReasonArticles(data.reasonArticles);
                        setShowSkyNews(data.showSkyNews);
                        setSkyNewsArticles(data.skyNewsArticles);
                        setShowSalon(data.showSalon);
                        setSalonArticles(data.salonArticles);
                        setShowMediaite(data.showMediaite);
                        setMediaiteArticles(data.mediaiteArticles);
                        setShowDerSpiegel(data.showDerSpiegel);
                        setDerSpiegelArticles(data.derSpiegelArticles);
                        setShowMarketwatch(data.showMarketwatch);
                        setMarketwatchArticles(data.marketwatchArticles);
                        setShowJerusalemPost(data.showJerusalemPost);
                        setJerusalemPostArticles(data.jerusalemPostArticles);
                        setShowRCP(data.showRCP);
                        setRCPArticles(data.rcpArticles);
                        setShowBostonGlobe(data.showBostonGlobe);
                        setBostonGlobeArticles(data.bostonGlobeArticles);
                        setShowNYPOST(data.showNYPOST);
                        setNYPOSTArticles(data.NYPOSTArticles);
                        setShowTheSunUs(data.showTheSunUs);
                        setTheSunUsArticles(data.theSunUsArticles);
                        setShowRussiaToday(data.showRussiaToday);
                        setRussiaTodayArticles(data.russiaTodayArticles);
                        setShowNtd(data.showNtd);
                        setNtdArticles(data.ntdArticles);
                        setShowWsjWorld(data.showWsjWorld);
                        setWsjWorldArticles(data.wsjWorldArticles);
                        setShowCnbcUs(data.showCnbcUs);
                        setCnbcUsArticles(data.cnbcUsArticles);
                        setShowFiveThirtyEight(data.showFiveThirtyEight);
                        setFiveThirtyEightArticles(data.fiveThirtyEightArticles);
                        setShowVox(data.showVox);
                        setVoxArticles(data.voxArticles);
                        setShowWapo(data.showWapo);
                        setWapoArticles(data.wapoArticles);
                        setShowSlate(data.showSlate);
                        setSlateArticles(data.slateArticles);
                        setShowTheIntercept(data.showTheIntercept);
                        setTheInterceptArticles(data.theInterceptArticles);
                        setShowJacobin(data.showJacobin);
                        setJacobinArticles(data.jacobinArticles);
                    }
                });
            }
        });
        return () => unsubscribe(); //cleanup function - unsubscribes the listener when the component is unmounted to prevent memory leaks
    }, [isRSSDataFetched]); // effect triggered when 'isRSSDataFetched' state variable changes


    useEffect(() => {
        const fetchRSSData = async (source) => {
            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=${API_KEY_1_RSS2JSON}`);
                
                if (!response.ok) {
                    if (response.status === 429) {
                        throw new Error('You are using all the available feeds for your account, upgrade to get more feeds ( https://rss2json.com/plans ).');
                    }
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                // console.log(`${source.name} Data:`, data);
                source.currentData = data;
                
            } catch (error) {
                console.error(`Error fetching ${source.name} RSS data:`, error);
                if (error.message === 'You are using all the available feeds for your account, upgrade to get more feeds ( https://rss2json.com/plans ).') {
                    try {
                        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&api_key=${API_KEY_2_RSS2JSON}`);
                        
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        
                        const data = await response.json();
                        // console.log(`${source.name} Data (with new API key):`, data);
                        source.currentData = data;
                    } catch (error) {
                        console.error(`Error fetching ${source.name} RSS data with new API key:`, error);
                    }
                }
            }
        };
        

        Promise.all(newsSources.map((source) => fetchRSSData(source)))
            .then(() => setIsRSSDataFetched(true))
            .catch((error) => {
                console.error('Error fetching RSS data:', error);
                setIsRSSDataFetched(true); // Set to true even if there's an error to prevent blocking the user settings useEffect
            });
    }, []);


    const handleSave = () => {
        if (user) {
            const settingsRef = firebase.firestore().collection('settings').doc(user.uid);
            settingsRef.set({
                showDemocracyNow, democracyNowArticles,
                showNewYorkTimes, newYorkTimesArticles,
                showDailyMail, dailyMailArticles,
                showTheHill, theHillArticles,
                showDailyBeast, dailyBeastArticles,
                showAxios, axiosArticles,
                showNewYorker, newYorkerArticles,
                showNewsweek, newsweekArticles,
                showTheDispatch, theDispatchArticles,
                showTheBlaze, theBlazeArticles,
                showBreitbart, brietbartAritcles,
                showTheFederalist, theFederalistArticles,
                showOneAmericaNews, oneAmericaNewsArticles,
                showWashingtonFreeBeacon, washingtonFreeBeaconArticles,
                showNationalReview, nationalReviewArticles,
                showReason, reasonArticles,
                showSkyNews, skyNewsArticles,
                showSalon, salonArticles,
                showMediaite, mediaiteArticles,
                showDerSpiegel, derSpiegelArticles,
                showMarketwatch, marketwatchArticles,
                showJerusalemPost, jerusalemPostArticles,
                showRCP, rcpArticles,
                showBostonGlobe, bostonGlobeArticles,
                showNYPOST, NYPOSTArticles,
                showTheSunUs, theSunUsArticles,
                showRussiaToday, russiaTodayArticles,
                showNtd, ntdArticles,
                showWsjWorld, wsjWorldArticles,
                showCnbcUs, cnbcUsArticles,
                showFiveThirtyEight, fiveThirtyEightArticles,
                showVox, voxArticles,
                showWapo, wapoArticles,
                showSlate, slateArticles,
                showTheIntercept, theInterceptArticles,
                showJacobin, jacobinArticles,
            });
        }
        setIsFlashing(true);
        setTimeout(() => {
            setIsFlashing(false);
        }, 300); // Toggle the delay
    };


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className='navbar'>
                <div className="menu-header" onClick={handleMenuToggle}>
                    <div className='menu-icon-wrapper'>
                        {isMenuOpen ? <p className="x-icon">X</p> : <div className="hamburger-icon">☰</div>}
                    </div>
                    <h2 className='my-feed-text'>My Feed</h2>
                </div>              
                <span className='website-title'>MediaMosiac</span>
                <div className='desktop-user-auth-component'>
                    <UserAuth isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
            </nav>
            
            {/* NEWS  SOURCES  AND  CHECKBOXES */}
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <div className='mobile-user-auth-component'>
                        <h3 className='mobile-dropdown-account-header'>Account</h3>
                        <UserAuth isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    </div>
                    <div className='left-and-article-count-container'>
                        <h3 className='dropdown-political-alignment-header'>Left</h3>
                        <u className='dropdown-menu-article-count-label'>Article Count</u>
                    </div>
                    {newsSourceCheckboxesAndArticleAmounts('Boston Globe', showBostonGlobe, setShowBostonGlobe, bostonGlobeArticles, setBostonGlobeArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Daily Beast', showDailyBeast, setShowDailyBeast, dailyBeastArticles, setDailyBeastArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Democracy Now!', showDemocracyNow, setShowDemocracyNow, democracyNowArticles, setDemocracyNowArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Jacobin', showJacobin, setShowJacobin, jacobinArticles, setJacobinArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('New Yorker', showNewYorker, setShowNewYorker, newYorkerArticles, setNewYorkerArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Salon', showSalon, setShowSalon, salonArticles, setSalonArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Slate', showSlate, setShowSlate, slateArticles, setSlateArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('The Intercept', showTheIntercept, setShowTheIntercept, theInterceptArticles, setTheInterceptArticles)}
                    <h3 className='dropdown-political-alignment-header'>Center Left</h3>
                    {newsSourceCheckboxesAndArticleAmounts('Axios', showAxios, setShowAxios, axiosArticles, setAxiosArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Der Spiegel', showDerSpiegel, setShowDerSpiegel, derSpiegelArticles, setDerSpiegelArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Five Thirty Eight', showFiveThirtyEight, setShowFiveThirtyEight, fiveThirtyEightArticles, setFiveThirtyEightArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Mediaite', showMediaite, setShowMediaite, mediaiteArticles, setMediaiteArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('New York Times', showNewYorkTimes, setShowNewYorkTimes, newYorkTimesArticles, setNewYorkTimesArticles, true)}
                    {newsSourceCheckboxesAndArticleAmounts('Vox', showVox, setShowVox, voxArticles, setVoxArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Washington Post - Politics', showWapo, setShowWapo, wapoArticles, setWapoArticles)}
                    <h3 className='dropdown-political-alignment-header'>Center</h3>
                    {newsSourceCheckboxesAndArticleAmounts('CNBC - US News', showCnbcUs, setShowCnbcUs, cnbcUsArticles, setCnbcUsArticles)}                  
                    {newsSourceCheckboxesAndArticleAmounts('The Hill', showTheHill, setShowTheHill, theHillArticles, setTheHillArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Jerusalem Post', showJerusalemPost, setShowJerusalemPost, jerusalemPostArticles, setJerusalemPostArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Marketwatch', showMarketwatch, setShowMarketwatch, marketwatchArticles, setMarketwatchArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Newsweek', showNewsweek, setShowNewsweek, newsweekArticles, setNewsweekArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Real Clear Politics', showRCP, setShowRCP, rcpArticles, setRCPArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Sky News', showSkyNews, setShowSkyNews, skyNewsArticles, setSkyNewsArticles)}
                    <h3 className='dropdown-political-alignment-header'>Center Right</h3>
                    {newsSourceCheckboxesAndArticleAmounts('New Tang Dynasty', showNtd, setShowNtd, ntdArticles, setNtdArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('New York Post', showNYPOST, setShowNYPOST, NYPOSTArticles, setNYPOSTArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Reason', showReason, setShowReason, reasonArticles, setReasonArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Russia Today', showRussiaToday, setShowRussiaToday, russiaTodayArticles, setRussiaTodayArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('The Dispatch', showTheDispatch, setShowTheDispatch, theDispatchArticles, setTheDispatchArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('The Sun', showTheSunUs, setShowTheSunUs, theSunUsArticles, setTheSunUsArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Wall Street Journal - World', showWsjWorld, setShowWsjWorld, wsjWorldArticles, setWsjWorldArticles)}
                    <h3 className='dropdown-political-alignment-header'>Right</h3>
                    {newsSourceCheckboxesAndArticleAmounts('Breitbart', showBreitbart, setShowBreitbart, brietbartAritcles, setBreitbartArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Daily Mail', showDailyMail, setShowDailyMail, dailyMailArticles, setDailyMailArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('National Review', showNationalReview, setShowNationalReview, nationalReviewArticles, setNationalReviewArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('One America News', showOneAmericaNews, setShowOneAmericaNews, oneAmericaNewsArticles, setOneAmericaNewsArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('The Blaze', showTheBlaze, setShowTheBlaze, theBlazeArticles, setTheBlazeArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('The Federalist', showTheFederalist, setShowTheFederalist, theFederalistArticles, setTheFederalistArticles)}
                    {newsSourceCheckboxesAndArticleAmounts('Washington Free Beacon', showWashingtonFreeBeacon, setShowWashingtonFreeBeacon, washingtonFreeBeaconArticles, setWashingtonFreeBeaconArticles)}
                    <div className='save-button-container'>
                        <button 
                            className={isFlashing ? 'save-button flashing' : 'save-button'}
                            onClick={handleSave}
                        >Save</button>
                    </div>
                </div>
            )}
            {/*  NEWS  ARTICLES  */}
            <div className='five-column-container'>
                <div>
                    <h3 className='political-alignment-header'>Left</h3>
                    {showBostonGlobe && newsArticles(showBostonGlobe, bostonGlobeArticles, 23, newsSources)}
                    {showDailyBeast && newsArticles(showDailyBeast, dailyBeastArticles, 4, newsSources)}
                    {showDemocracyNow && newsArticles(showDemocracyNow, democracyNowArticles, 0, newsSources)}
                    {showJacobin && newsArticles(showJacobin, jacobinArticles, 35, newsSources)}
                    {showNewYorker && newsArticles(showNewYorker, newYorkerArticles, 6, newsSources)}
                    {showSalon && newsArticles(showSalon, salonArticles, 17, newsSources)}
                    {showSlate && newsArticles(showSlate, slateArticles, 33, newsSources)}
                    {showTheIntercept && newsArticles(showTheIntercept, theInterceptArticles, 34, newsSources)}
                </div>
                <div>
                    <h3 className='political-alignment-header'>Center Left</h3>
                    {showAxios && newsArticles(showAxios, axiosArticles, 5, newsSources)}
                    {showDerSpiegel && newsArticles(showDerSpiegel, derSpiegelArticles, 19, newsSources)}
                    {showFiveThirtyEight && newsArticles(showFiveThirtyEight, fiveThirtyEightArticles, 30, newsSources)}
                    {showMediaite && newsArticles(showBostonGlobe, bostonGlobeArticles, 18, newsSources)}
                    {showNewYorkTimes && newsArticles(showNewYorkTimes, newYorkTimesArticles, 1, newsSources)}
                    {showVox && newsArticles(showVox, voxArticles, 31, newsSources)}
                    {showWapo && newsArticles(showWapo, wapoArticles, 32, newsSources)}
                </div>
                <div>
                    <h3 className='political-alignment-header'>Center</h3>
                    {showCnbcUs && newsArticles(showCnbcUs, cnbcUsArticles, 29, newsSources)}
                    {showTheHill && newsArticles(showTheHill, theHillArticles, 3, newsSources)}
                    {showJerusalemPost && newsArticles(showJerusalemPost, jerusalemPostArticles, 21, newsSources)}
                    {showMarketwatch && newsArticles(showMarketwatch, marketwatchArticles, 20, newsSources)}
                    {showNewsweek && newsArticles(showNewsweek, newsweekArticles, 7, newsSources)}
                    {showRCP && newsArticles(showRCP, rcpArticles, 22, newsSources)}
                    {showSkyNews && newsArticles(showSkyNews, skyNewsArticles, 16, newsSources)}
                </div>
                <div>
                    <h3 className='political-alignment-header'>Center Right</h3>
                    {showNtd && newsArticles(showNtd, ntdArticles, 27, newsSources)}
                    {showNYPOST && newsArticles(showNYPOST, NYPOSTArticles, 24, newsSources)}
                    {showReason && newsArticles(showReason, reasonArticles, 15, newsSources)}
                    {showRussiaToday && newsArticles(showRussiaToday, russiaTodayArticles, 26, newsSources)}
                    {showTheDispatch && newsArticles(showTheDispatch, theDispatchArticles, 8, newsSources)}
                    {showTheSunUs && newsArticles(showTheSunUs, theSunUsArticles, 25, newsSources)}
                    {showWsjWorld && newsArticles(showWsjWorld, wsjWorldArticles, 28, newsSources)}
                </div>
                <div>
                    <h3 className='political-alignment-header'>Right</h3>
                    {showBreitbart && newsArticles(showBreitbart, brietbartAritcles, 10, newsSources)}
                    {showDailyMail && newsArticles(showDailyMail, dailyMailArticles, 2, newsSources)}
                    {showNationalReview && newsArticles(showNationalReview, nationalReviewArticles, 14, newsSources)}
                    {showOneAmericaNews && newsArticles(showOneAmericaNews, oneAmericaNewsArticles, 12, newsSources)}
                    {showTheBlaze && newsArticles(showTheBlaze, theBlazeArticles, 9, newsSources)}
                    {showTheFederalist && newsArticles(showTheFederalist, theFederalistArticles, 11, newsSources)}
                    {showWashingtonFreeBeacon && newsArticles(showWashingtonFreeBeacon, washingtonFreeBeaconArticles, 13, newsSources)}
                </div>
            </div>
            <div className='swiper-container'>
                    <Swiper
                        pagination= {{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Pagination, Navigation]}
                        autoHeight
                        onSlideChange={ () => {window.scrollTo({ top: 0, behavior: 'smooth' })} }   
                        >                       
                        <SwiperSlide>
                            <div className="swiper-slide-content">
                                <h3 className='political-alignment-header'>Left</h3>
                                {showBostonGlobe && newsArticles(showBostonGlobe, bostonGlobeArticles, 23, newsSources)}
                                {showDailyBeast && newsArticles(showDailyBeast, dailyBeastArticles, 4, newsSources)}
                                {showDemocracyNow && newsArticles(showDemocracyNow, democracyNowArticles, 0, newsSources)}
                                {showJacobin && newsArticles(showJacobin, jacobinArticles, 35, newsSources)}
                                {showNewYorker && newsArticles(showNewYorker, newYorkerArticles, 6, newsSources)}
                                {showSalon && newsArticles(showSalon, salonArticles, 17, newsSources)}
                                {showSlate && newsArticles(showSlate, slateArticles, 33, newsSources)}
                                {showTheIntercept && newsArticles(showTheIntercept, theInterceptArticles, 34, newsSources)}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide-content">
                                <h3 className='political-alignment-header'>Center Left</h3>
                                {showAxios && newsArticles(showAxios, axiosArticles, 5, newsSources)}
                                {showDerSpiegel && newsArticles(showDerSpiegel, derSpiegelArticles, 19, newsSources)}
                                {showFiveThirtyEight && newsArticles(showFiveThirtyEight, fiveThirtyEightArticles, 30, newsSources)}
                                {showMediaite && newsArticles(showBostonGlobe, bostonGlobeArticles, 18, newsSources)}
                                {showNewYorkTimes && newsArticles(showNewYorkTimes, newYorkTimesArticles, 1, newsSources)}
                                {showVox && newsArticles(showVox, voxArticles, 31, newsSources)}
                                {showWapo && newsArticles(showWapo, wapoArticles, 32, newsSources)}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide-content">
                                <h3 className='political-alignment-header'>Center</h3>
                                {showCnbcUs && newsArticles(showCnbcUs, cnbcUsArticles, 29, newsSources)}
                                {showTheHill && newsArticles(showTheHill, theHillArticles, 3, newsSources)}
                                {showJerusalemPost && newsArticles(showJerusalemPost, jerusalemPostArticles, 21, newsSources)}
                                {showMarketwatch && newsArticles(showMarketwatch, marketwatchArticles, 20, newsSources)}
                                {showNewsweek && newsArticles(showNewsweek, newsweekArticles, 7, newsSources)}
                                {showRCP && newsArticles(showRCP, rcpArticles, 22, newsSources)}
                                {showSkyNews && newsArticles(showSkyNews, skyNewsArticles, 16, newsSources)}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide-content">
                                <h3 className='political-alignment-header'>Center Right</h3>
                                {showNtd && newsArticles(showNtd, ntdArticles, 27, newsSources)}
                                {showNYPOST && newsArticles(showNYPOST, NYPOSTArticles, 24, newsSources)}
                                {showReason && newsArticles(showReason, reasonArticles, 15, newsSources)}
                                {showRussiaToday && newsArticles(showRussiaToday, russiaTodayArticles, 26, newsSources)}
                                {showTheDispatch && newsArticles(showTheDispatch, theDispatchArticles, 8, newsSources)}
                                {showTheSunUs && newsArticles(showTheSunUs, theSunUsArticles, 25, newsSources)}
                                {showWsjWorld && newsArticles(showWsjWorld, wsjWorldArticles, 28, newsSources)}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide-content">
                                <h3 className='political-alignment-header'>Right</h3>
                                {showBreitbart && newsArticles(showBreitbart, brietbartAritcles, 10, newsSources)}
                                {showDailyMail && newsArticles(showDailyMail, dailyMailArticles, 2, newsSources)}
                                {showNationalReview && newsArticles(showNationalReview, nationalReviewArticles, 14, newsSources)}
                                {showOneAmericaNews && newsArticles(showOneAmericaNews, oneAmericaNewsArticles, 12, newsSources)}
                                {showTheBlaze && newsArticles(showTheBlaze, theBlazeArticles, 9, newsSources)}
                                {showTheFederalist && newsArticles(showTheFederalist, theFederalistArticles, 11, newsSources)}
                                {showWashingtonFreeBeacon && newsArticles(showWashingtonFreeBeacon, washingtonFreeBeaconArticles, 13, newsSources)}
                            </div>
                        </SwiperSlide>
                    </Swiper>
            </div>
        </>
    );
};

export default NewsFeed;