import { Routes, Route } from 'react-router-dom'
import Feed from '../pages/Feed'
import FeedItem from '../pages/FeedItem'
import Contact from '../pages/Contact'
import Recommend from '../pages/Recommend'
import About from '../pages/About'

import { ROUTES } from '../consts'
import Error404 from '../pages/Error404'

const Router = () => (
  <Routes>
    <Route path={ROUTES.feed.href()} element={<Feed />} />
    <Route path={ROUTES.episode.href()} element={<FeedItem />} />
    <Route path={ROUTES.contact.href()} element={<Contact />} />
    <Route path={ROUTES.recommend.href()} element={<Recommend />} />
    <Route path={ROUTES.about.href()} element={<About />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default Router
