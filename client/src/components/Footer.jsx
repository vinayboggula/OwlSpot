import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="text-center px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 text-gray-500">

            <div className="py-10 border-b border-gray-300/40">
                <div className="flex flex-col items-center text-center gap-4">

                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img src="../owl.svg" alt="OwlSpot logo" className="h-8 w-8" />
                        <h2 className="font-bold text-xl text-gray-900">OwlSpot</h2>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed">
                        OwlSpot – <span className="font-medium">Online Wall of Life</span> is a
                        student-focused platform to write daily blogs, preserve memories,
                        and track achievements throughout the academic journey.
                    </p>

                </div>
            </div>
            <p className="py-4 text-center text-sm text-gray-500/80">
                © 2025 OwlSpot. All rights reserved.
            </p>

        </footer>
    )
}

export default Footer
