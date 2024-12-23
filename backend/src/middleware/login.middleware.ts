const loginMiddleware = async (req: any, res: any, next: any) => {
    try {
        if(req.session.logged == false) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: true, message: 'Internal server error' });
    }
}

export default loginMiddleware;