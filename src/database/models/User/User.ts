import { Model, model, Schema } from 'mongoose';
import { TUserDocument } from './user.types';

const userSchema: Schema = new Schema({

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]

});

const userModel: Model<TUserDocument> = model<TUserDocument>('User', userSchema);

export default userModel;
