const DAL = require('./DAL')

const membersURl = 'http://localhost:7000/api/members'
const subscriptionURl = 'http://localhost:7000/api/subscription'
const movieURl = 'http://localhost:7000/api/movies'


export const getAllMembers = async()=>{
    let members = await DAL.getAll(membersURl)
    let subscriptions = await DAL.getAll(subscriptionURl)
    let allmovies = await DAL.getAll(movieURl)

    let newMembers= []
    members.forEach(member => {
        let moviesWatch = getMovieWatchById(subscriptions, allmovies, member._id)
        newMembers.push({...member, movies: moviesWatch})
    })
    return newMembers
}

const getMovieWatchById = (subscription, allMovies, id) =>{
    let movieArr = subscription.find(subs => subs.memberId === id)
    if(movieArr !== undefined){
    let shapedMovie = []
        movieArr.movies.forEach(movie => {
            let obj = {
                name: getMovieNameById(allMovies, movie.movieId),
                date: movie.date,
                id: movie.movieId
            }
            shapedMovie.push(obj)
        })
        return shapedMovie
    }else{
        return [] // return empty err to not brike the map()
    }
}

// get by anly id paramter
export const getMovieWatchByOnlyId = async(id) =>{
    let subscription = await DAL.getAll(subscriptionURl)
    let allmovies = await DAL.getAll(movieURl)

    let movieArr = subscription.find(subs => subs.memberId === id)
    let shapedMovie = []
    if(movieArr !== undefined){
        movieArr.movies.forEach(movie => {
            let obj = {
                name: getMovieNameById(allmovies, movie.movieId),
                date: movie.date,
                id: movie.movieId
            }
            shapedMovie.push(obj)
        })
        return shapedMovie
    }else{
        return [] // return empty err to not brike the map()
    }    
}

const getMovieNameById = (allMovies, movieId) =>{
    let movieToReturn = allMovies.find(movie => movie._id === movieId)
    return movieToReturn.name
}

export const deleteMemmber = async(id) =>{
    let resp = await DAL.deleteObj(id, membersURl )
    let respSubs = await deleteFormSubsciption(id)
    if(resp && respSubs){
        return true
    }else{
        return false
    }
}

const deleteFormSubsciption =async(id)=>{
    let subscriptions = await DAL.getAll(subscriptionURl)
    let subsId = subscriptions.filter(s => s.memberId === id)
    if(subsId.length  ===  1){
        let resp = await DAL.deleteObj(subsId[0]._id, subscriptionURl)
        if(resp){
            return true
        }
    }
    return true  
}
export const addMemberToMovie = async(memberId, newMovie) => {
    const subscription = await DAL.getAll(subscriptionURl)
    let thisSubs = subscription.filter(s => s.memberId === memberId)
    if(thisSubs.length  ===  1){
        let newMoviesArr = thisSubs[0].movies
        newMoviesArr.push(newMovie)
        thisSubs[0].movies = newMoviesArr
        let resp = await DAL.updateExsist(thisSubs[0]._id, subscriptionURl, {...thisSubs[0]})
        if(resp){
            return true
        }else{
            return false
        }
    }else{
        let resp = await DAL.createNew(subscriptionURl, {
            memberId: memberId,
            movies:[{...newMovie}]
        })
        if(resp){
            return true
        }else{
            return false
        }
    }
}