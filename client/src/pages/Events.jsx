import EventHeader from "../components/EventHeader"
import EventList from "../components/EventList"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"


const Events = () => {
    return (
        <>
            <Navbar />
            <EventHeader />
            <EventList />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Events

