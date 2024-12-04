import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    icon:string;
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private readonly LOCAL_STORAGE_KEY = 'appConfig'; 
    _config: AppConfig = {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: './layout/styles/theme/arya-green/theme.css',
        scale: 12,
        icon:'heroSunSolid'
    };

    config = signal<AppConfig>(this._config);


    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        const storedConfig = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (storedConfig) {
            this._config = JSON.parse(storedConfig); // Asignar configuración guardada
        }

        this.config = signal<AppConfig>(this._config);
        
        effect(() => {
            this.changeTheme();
            this.onConfigUpdate();
        });
    }

    setTheme():void{

        if( this.config().colorScheme === 'dark' ){
            this.config.update(c => ({
                ...c,
                icon : 'heroMoonSolid',
                theme : './layout/styles/theme/arya-green/theme.css',
                colorScheme : 'ligth'
            }));

        } else {
            this.config.update(c => ({
                ...c,
                icon : 'heroSunSolid',
                theme : './layout/styles/theme/saga-green/theme.css',
                colorScheme : 'dark'
            }));
        }
    }

    themeLigth() {
        this.config.update(c => ({
            ...c,
            icon : 'heroSunSolid',
            theme : './layout/styles/theme/saga-green/theme.css',
            colorScheme : 'dark'
        }));
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    isIcon(){
        return this.config().icon;
    }

    isColor(){
        return this.config().colorScheme;
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._config));
    }

    changeTheme() {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', this.config().theme);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }
}
