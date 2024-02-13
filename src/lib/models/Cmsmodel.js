    import { DataTypes, Model } from 'sequelize';

    import db from '$lib/db';

    class Cmsmodel extends Model {

    }

    const model = Cmsmodel.init({
            id: {
                type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
            },
            title: {type: DataTypes.STRING},
            name_attributes: {type: DataTypes.STRING},
            data_attributes: {type: DataTypes.STRING},
            json_attr: {type: DataTypes.STRING},
            models: {type: DataTypes.STRING},
        },
        {
            sequelize: db,
            tableName: 'cms_models',
        }
    );
    export default model;
