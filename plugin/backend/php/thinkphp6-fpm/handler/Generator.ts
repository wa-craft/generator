
import AbstractGenerator from '../../../../../src/AbstractGenerator.ts';
import * as Model from './model/mod.ts';

class Generator extends AbstractGenerator {
	data: any = {};
	pluginPath: string = '';
	templatePath: string = '';

	constructor(data: any) {
		super();
		this.data = data;

		this.pluginPath = `plugin/backend/${data.config.backend}`;
		this.templatePath = `./${this.pluginPath}/template`;
	}

	execute(): void {
		//read data file
		/*
		const schemas = this.data.components.schemas
		for (const schemaKey of Object.keys(schemas)) {
			console.log(schemas[schemaKey].properties??'');
		}
		*/
		this.paths();
		this.models();
	}

	/**
	 * process paths and turn path to controoler/router
	 * make controller array then process
	 */
	async paths(): Promise<void> {
		const paths = this.data.paths;
		let targetPath = `${this.data.config.target}/backend/app/controller`;

		let routers: any[] = [];
		let preRoutes: any[] = [];
		let controller;

		/**
		 * process path step 1: turn path objects to array
		 * length - 1: method
		 * length - 2: class
		 * length - (2+): paths
		 */
		for (const pathKey of Object.keys(paths)) {
			let pathArray = pathKey.split('/');
			let name = pathArray[pathArray.length - 2] ?? '';
			preRoutes.push({
				method: pathArray[pathArray.length - 1] ?? '',
				className: name.charAt(0).toUpperCase() + name.slice(1),
				path: pathArray.splice(0, pathArray.length - 2).join('/')
			});
		}

		/**
		 * combine routes with same name and path
		 */
		let tmpRoutes = preRoutes;
		for(const i in preRoutes) {
			let newRoute = { 
				className: preRoutes[i].className ?? '',
				path: preRoutes[i].path?? '',
				methods: preRoutes[i].methods ?? []
			}

			//use delete to set an element of array to undefined, and remove it from loop
			for(const j in tmpRoutes) {
				if(tmpRoutes[j] !== undefined && newRoute.className === tmpRoutes[j].className && newRoute.path === tmpRoutes[j].path) {
					newRoute.methods.push({ name: tmpRoutes[j].method });
					delete tmpRoutes[j];
				}
			}
			routers.push(newRoute);
		}

		routers.forEach(route => {
			let filePath = (route.path !== '') 
				? `${targetPath}/${route.path.slice(1)}/${route.className}.php`
				: `${targetPath}/${route.className}.php`;

			const namespace = (route.path === '') 
				? 'app\\controller' 
				: `app\\controller\\${route.path.slice(1).replace('/','\\')}`;

			let controller = {
				className: route.className,
				namespace: namespace,
				methods: route.methods
			};
			this.writeFromTemplateFile(`${this.templatePath}/controller.html`, filePath, controller);
		});
	}

	/**
	 * generate model codes
	 */
	async models(): Promise<void> {
		const schemas = this.data.components.schemas
		let targetPath = `${this.data.config.target}/backend/app/model`;

		let model;
		for (const schemaKey of Object.keys(schemas)) {
			let filePath = `${targetPath}/${schemaKey}.php`;
			model = new Model.Model(schemas[schemaKey] ?? {});
			model.name = schemaKey;
			model.namespace = 'app\\model';

			this.writeFromTemplateFile(`${this.templatePath}/model.html`, filePath, model.getJson());
		}
	}

	dump(): void {
		console.info(this.data);
	}
}

export default Generator;