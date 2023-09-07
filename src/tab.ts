class ResumeTab {
    id: number;
    name: string;
    active: boolean;

    constructor(id: number, name: string, active: boolean) {
        this.id = id;
        this.name = name;
        this.active = active;
    }
}

class ResumeTabManager {
    private Tabs: ResumeTab[];

    constructor(tabs: ResumeTab[]) {
        this.Tabs = tabs;
    }

    Activate(tabId: number) {
        if (!this.Tabs.includes(this.Tabs[tabId])) {
            console.log('[TabManager] Unable to locate tab for resume.');
            return;
        }
        this.Tabs = manager.Tabs.map((tab) => {
            if (tab.id == tabId) {
                console.log(this.Tabs);
                tab.active = true;
            } else {
                tab.active = false;
            }
            return { ...tab };
        });
    }

    GetTab(tabId: number): ResumeTab | undefined {
        return manager.Tabs.find((x) => x.id == tabId);
    }

    GetTabs(): ResumeTab[] {
        return this.Tabs;
    }
}
