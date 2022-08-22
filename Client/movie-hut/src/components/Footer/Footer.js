export const Footer = () => {
    return (
        <footer
            className=" text-center text-white"
            style={{ backgroundColor: "#32CD32" }}
        >
            <div className="container p-4">
                <section className="mb-4">
                    <p>Movie Hub</p>
                </section>
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                {'© 2022 Copyright: '}
                    <div>
                        <a className="text-white" href="https://github.com/vvalentinov">
                            Valentin Valentinov
                        </a>
                    </div>
                    <div>
                        <a className="text-white" href="https://github.com/RadinTiholov">
                            Radin Tiholov
                        </a>
                    </div>
            </div>
            {/* Copyright */}
        </footer>
    )
}