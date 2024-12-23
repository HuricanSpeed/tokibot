const isLogged = async (req: any, res: any) => {
    try {
        if (req.session.logged) {
            res.json({ success: true, logged: true, user: req.session.accountData, adminGuilds: req.session.adminGuilds });
        } else {
            res.json({ success: true, logged: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export {
    isLogged
}