import {IntrospectionFragmentMatcher} from 'react-apollo';

export default new IntrospectionFragmentMatcher({
	introspectionQueryResultData: {
		__schema: {
			types: [
				{
					kind         : "UNION",
					name         : "UserOrError",
					possibleTypes: [
						{name: "User"},
						{name: "Error"},
					],
				}, // this is just an example, put your own INTERFACE and UNION types here!
			],
		},
	}
});