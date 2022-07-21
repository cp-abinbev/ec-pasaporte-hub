import TagManager from 'react-gtm-module';

export const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.0/8 are considered localhost for IPv4.
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export const startGtmContainers = (gtm) => {
	const url = window.location.origin;
	if (gtm.data && gtm.pdf.replace(/\/$/,'') === url) {
		InitTagManager(gtm.data);
	}
};

export const InitTagManager = (gtmId) => {
	if (!isLocalhost) {
		const args = {
			gtmId,
		};

		TagManager.initialize(args);
	}

	return TagManager;
};
