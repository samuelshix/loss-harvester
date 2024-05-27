/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/nft/tokens-for-address/:path*',
                destination: `https://api-mainnet.magiceden.dev/v2/wallets/:path*`,
            },
            {
                source: '/api/nft/collection-stats/:path*',
                destination: `https://api-mainnet.magiceden.dev/v2/collections/:path*`,
            },
        ]
    },
};

export default nextConfig;
