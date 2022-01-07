import { ActorCreate } from "./Components/MovieComponent/Actor/ActorCreate";
import { ActorIndex } from "./Components/MovieComponent/Actor/ActorIndex";
import { ActorUpdate } from "./Components/MovieComponent/Actor/ActorUpdate";
import { Filter } from "./Components/MovieComponent/Filter";
import { GenreCreate } from "./Components/MovieComponent/Genre/GenreCreate";
import { GenreIndex } from "./Components/MovieComponent/Genre/GenreIndex";
import { GenreUpdate } from "./Components/MovieComponent/Genre/GenreUpdate";
import { MovieCreate } from "./Components/MovieComponent/Movie/MovieCreate";
import { MovieDetail } from "./Components/MovieComponent/Movie/MovieDetail";
import { MovieIndex } from "./Components/MovieComponent/Movie/MovieIndex";
import { MovieUpdate } from "./Components/MovieComponent/Movie/MovieUpdate";
import { MovieTheaterCreate } from "./Components/MovieComponent/MovieTheater/MovieTheaterCreate";
import { MovieTheaterIndex } from "./Components/MovieComponent/MovieTheater/MovieTheaterIndex";
import { MovieTheaterUpdate } from "./Components/MovieComponent/MovieTheater/MovieTheaterUpdate";
import { ShowPoster } from "./Components/MovieComponent/ShowPoster";
import { RedirectAuto } from "./Components/Utilities/RedirectAuto";

const routing = [
    { path: '/', component: ShowPoster, exact: true },
    { path: '/filter', component: Filter },

    { path: '/the-loai', component: GenreIndex, exact: true },
    { path: '/the-loai/them', component: GenreCreate },
    { path: '/the-loai/sua/:id(\\d+)', component: GenreUpdate },

    { path: '/dien-vien', component: ActorIndex, exact: true },
    { path: '/dien-vien/them', component: ActorCreate },
    { path: '/dien-vien/sua/:id(\\d+)', component: ActorUpdate },

    { path: '/rap', component: MovieTheaterIndex, exact: true },
    { path: '/rap/them', component: MovieTheaterCreate },
    { path: '/rap/sua/:id(\\d+)', component: MovieTheaterUpdate },

    { path: '/phim', component: MovieIndex, exact: true },
    { path: '/phim/them', component: MovieCreate },
    { path: '/phim/sua/:id(\\d+)', component: MovieUpdate },
    { path: '/phim/:id(\\d+)', component: MovieDetail },
    
    { path: '*', component: RedirectAuto },
];

export default routing;