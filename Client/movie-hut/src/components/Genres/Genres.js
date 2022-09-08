import { Link } from "react-router-dom"
import { Card } from "../Card/Card"

export const Genres = () => {
    return (
        <>
            <p className="text-center display-4">Genres</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    <Card key={1} title="Action" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Action_buq6s1.jpg" id="1" isGenre={true} />
                    <Card key={2} title="Adventure" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568653/Genres/Adventure_gvoglm.jpg" id="2" isGenre={true} />
                    <Card key={3} title="Animated" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Animated_qxnsdi.jpg" id="3" isGenre={true} />
                    <Card key={4} title="Biology" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Biology_gzv3dv.jpg" id="4" isGenre={true} />
                    <Card key={5} title="Comedy" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Comedy_dn4bnp.jpg" id="5" isGenre={true} />
                    <Card key={6} title="Crime" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Crime_mjkkt1.jpg" id="6" isGenre={true} />
                    <Card key={7} title="Detective" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Detective_x7qcpj.jpg" id="7" isGenre={true} />
                    <Card key={8} title="Family" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Family_hqykzs.jpg" id="8" isGenre={true} />
                    <Card key={9} title="Fantasy" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/Fantasy_ahx75x.jpg" id="9" isGenre={true} />
                    <Card key={10} title="History" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568654/Genres/History_roqb2c.jpg" id="10" isGenre={true} />
                    <Card key={11} title="Horror" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568655/Genres/Horror_zikpbv.jpg" id="11" isGenre={true} />
                    <Card key={12} title="Indie" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568657/Genres/Indie_qkuyj3.jpg" id="12" isGenre={true} />
                    <Card key={13} title="Melodrama" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/Melodrama_aepv1a.jpg" id="13" isGenre={true} />
                    <Card key={14} title="Musicals" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568655/Genres/Musicals_nordua.jpg" id="14" isGenre={true} />
                    <Card key={15} title="Mystery" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/Mystery_t7eztc.jpg" id="15" isGenre={true} />
                    <Card key={16} title="Romance" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568655/Genres/Romance_quy0ls.jpg" id="16" isGenre={true} />
                    <Card key={17} title="Sci-Fi" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/Sci-Fi_e4sqle.jpg" id="17" isGenre={true} />
                    <Card key={18} title="Sports" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/Sports_zci7ud.jpg" id="18" isGenre={true} />
                    <Card key={19} title="Teen" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/Teen_fmsn4q.jpg" id="19" isGenre={true} />
                    <Card key={20} title="Thriller" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568658/Genres/Thriller_oz75bk.jpg" id="20" isGenre={true} />
                    <Card key={21} title="War" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568656/Genres/War_i9juvc.jpg" id="21" isGenre={true} />
                    <Card key={22} title="Westerns" posterUrl="https://res.cloudinary.com/dpp1p7r1x/image/upload/v1662568657/Genres/Westerns_ew5obx.jpg" id="22" isGenre={true} />
                </div>
            </div>
        </>
    )
}