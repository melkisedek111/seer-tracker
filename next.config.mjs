/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { dev }) => {
		if (dev) {
			config.watchOptions = {
				ignored: ["**/uploads/**", "**/src/files/**"], // Ignore the uploads folder during development
			};
		}
		return config;
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
};

export default nextConfig;
