import * as i0 from "@angular/core";
export type UiAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export declare class UiAvatarComponent {
    readonly size: import("@angular/core").InputSignal<UiAvatarSize>;
    readonly src: import("@angular/core").InputSignal<string>;
    readonly alt: import("@angular/core").InputSignal<string>;
    readonly fallback: import("@angular/core").InputSignal<string>;
    readonly imageError: import("@angular/core").WritableSignal<boolean>;
    onImageError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiAvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiAvatarComponent, "ui-avatar", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "src": { "alias": "src"; "required": false; "isSignal": true; }; "alt": { "alias": "alt"; "required": false; "isSignal": true; }; "fallback": { "alias": "fallback"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
