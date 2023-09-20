// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_me_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserMeModel _$UserMeModelFromJson(Map<String, dynamic> json) => UserMeModel(
      code: json['code'] as String,
      item: UserModel.fromJson(json['item'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$UserMeModelToJson(UserMeModel instance) =>
    <String, dynamic>{
      'code': instance.code,
      'item': instance.item,
    };
