export interface SiteConfig {
	siteName: string;
	template: string;
	theme: string;
	campaignId: string;
	crm: string | null,
	products: {
		id: string;
		price: number;
	}[];
	primaryColor: string;
	secondaryColor: string;
	company: {
		name: string;
		address: string;
		ein: string;
		email: string;
		phone: string;
	};
}

export interface products {
	id: string;
	price: number;
}

export interface CsvRow {
	[key: string]: string;
	siteName: string;
	template: string;
	theme: string;
	crm: string;
	campaignId: string;
	primaryColor: string;
	secondaryColor: string;
	companyName: string;
	companyAddress: string;
	ein: string;
	email: string;
	phone: string;
	product1Id: string;
	product1Price: string;
}


export type FileType = {
	name: string;
	isDirectory: boolean;
	relativePath: string;
	absolutePath: string;
	children?: FileType[];
	collapsed: boolean;
}

export interface EditorOpenedFile {
	name: string;
	path: string;
	content: string;
	dirty?: boolean;
}

export interface EditorState {
	selectedPath: string | null;
	fileTree: FileType[];
	openedFiles: EditorOpenedFile[];
	activeFile: EditorOpenedFile
	theme:string;
	loading: boolean;
}