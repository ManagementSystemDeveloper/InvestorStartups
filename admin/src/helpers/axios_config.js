const getDefaultBearerConfig = (token) => {
    return {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
}

export default getDefaultBearerConfig;