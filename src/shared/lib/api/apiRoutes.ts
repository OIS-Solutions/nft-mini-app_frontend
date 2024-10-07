export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const apiEndPoint = '/api'

export const apiRoutes = {
	nft: {
		baseRoute: 'api/nft',
		mint: 'api/nft/mint',
	},
	imageApi: {
		baseRoute: "/api/upload",
	},
	nftItemApi: {
		baseRoute: "/api/uri",
	}
}

export const apiPublicRoutes = {
	contracts: {
		baseRoute: '/tokensale-investment/',
	}
}