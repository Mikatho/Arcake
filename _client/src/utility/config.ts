let SERVER_LINK: string;

if (process.env.NODE_ENV === 'development') {
    SERVER_LINK = 'http://localhost:3001'
    console.log('i am in development')
} else {
    SERVER_LINK = ''
    console.log('i am in production')
}

export { SERVER_LINK }