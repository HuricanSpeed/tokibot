interface ModuleSettings {
    welcomer?: {
        enabled: boolean;
        channelId: string;
        customisedBackground: string;
    },
    leaver?: {
        enabled: boolean;
        channelId: string;
        customisedBackground: string;
    },
    autoRole?: {
        enabled: boolean;
        roleId: string[];
    },
    modLog?: {
        enabled: boolean;
        channelId: string | string[];
    },
}

export default ModuleSettings;