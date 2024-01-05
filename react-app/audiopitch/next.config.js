/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'awsname'
            }
        ],
        domains: ['images.unsplash.com']
    }
}

module.exports = nextConfig
