import DAL from './DAL'

const membersURl = 'http://localhost:7000/api/members'
const moviesURl = 'http://localhost:7000/api/movies'
const subscriptionURl = 'http://localhost:7000/api/subscription'

export const getAllData = async() =>{

    const membersData = await DAL.getAll(membersURl)
    const moviesData = await DAL.getAll(moviesURl)
    const subscriptionData = await DAL.getAll(subscriptionURl)

    let clearMovieData = []
    moviesData.forEach(movie => {
        let subscriptionsWatch = getNameAndDataBYMovieId(subscriptionData, membersData,  movie._id)
        let clearMovieObj = {
            id: movie._id,
            name : movie.name,
            premiered: movie.premiered? movie.premiered.slice(0, 4): movie.premiered,
            genres: movie.genres.join(', '),
            image : movie.image,
            subscriptions: [...subscriptionsWatch]
        }
        clearMovieData.push(clearMovieObj)
    })
    return clearMovieData
}
export const getMoviesById = async(id) => {
    const membersData = await DAL.getAll(membersURl)
    const moviesData = await DAL.getByID(id, moviesURl)
    const subscriptionData = await DAL.getAll(subscriptionURl)

        let subscriptionsWatch = getNameAndDataBYMovieId(subscriptionData, membersData,  id)
        let clearMovieObj = {
            id: moviesData._id,
            name : moviesData.name,
            premiered: moviesData.premiered? moviesData.premiered.slice(0, 4): moviesData.premiered,
            genres: moviesData.genres.join(', '),
            image : moviesData.image,
            subscriptions: [...subscriptionsWatch]
        }
    return clearMovieObj
} 
const getNameAndDataBYMovieId = (subscrptions, members,  movieId) =>{
    let dataToReturn = []
    subscrptions.forEach(subs => {
        let relevantMovie = subs.movies.filter(movie => movie.movieId === movieId)
        if(relevantMovie.length > 0){
            let memberName = members.filter(member => member._id === subs.memberId)
            let insertDate = relevantMovie[0].date? relevantMovie[0].date.slice(0,10) : '';
            let Name = memberName[0]? memberName[0].name: '';
            let objToReturn = {
                date : insertDate, 
                name: Name
            }
            dataToReturn.push(objToReturn)
        }
    })
    return dataToReturn
}
export const deleteMovie = async(movieId) =>{
    let respFromMovies = await DAL.deleteObj(movieId, moviesURl)
    let subscriptionToUpdate = await DAL.getAll(subscriptionURl)
    subscriptionToUpdate.forEach(async(sub) => {
        let newMoviesArr = sub.movies.filter(movie => movie.movieId !== movieId)
        sub.movies = newMoviesArr
        await DAL.updateExsist(sub._id, subscriptionURl, {...sub})
    })
    if(respFromMovies){
        return true
    }else{
        return false
    }
}