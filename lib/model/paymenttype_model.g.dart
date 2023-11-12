// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'paymenttype_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymenttypeModel _$PaymenttypeModelFromJson(Map<String, dynamic> json) =>
    PaymenttypeModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      name: json['name'] as String,
      date: json['date'] as String,
    );

Map<String, dynamic> _$PaymenttypeModelToJson(PaymenttypeModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
