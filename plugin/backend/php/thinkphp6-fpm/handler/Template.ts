import { IHandler } from "../../../../../src/IHandler.ts";

export default class Template implements IHandler{
	data: any = {};

	execute(data: any): any {
		console.log('After');
		this.appCommon();
		this.appEvent();
		this.appMiddleware();
		this.appProvider();
		this.appService();
		this.configApp();
		this.configCache();
		this.configConsole();
		this.configCookie();
		this.configDatabase();
		this.configFilesystem();
		this.configLang();
		this.configLog();
		this.configMiddleware();
		this.configRoute();
		this.configSession();
		this.configTrace();
		this.configView();
		this.dotEnv();
	}

	appCommon():void {

	}
	appEvent():void {

	}
	appMiddleware():void {

	}
	appProvider():void {

	}
	appService():void {

	}
	configApp():void {

	}
	configCache():void {

	}
	configConsole():void {

	}
	configCookie():void {

	}
	configDatabase():void {

	}
	configFilesystem():void {

	}
	configLang():void {

	}
	configLog():void {

	}
	configMiddleware():void {

	}
	configRoute():void {

	}
	configSession():void {

	}
	configTrace():void {

	}
	configView():void {

	}
	dotEnv():void {

	}
	
};
