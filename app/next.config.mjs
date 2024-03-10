/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/get-nfts/:path*',
                destination: `https://api-mainnet.magiceden.dev/v2/wallets/:path*`,
            },
        ]
    },
};

export default nextConfig;
