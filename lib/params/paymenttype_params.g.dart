// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'paymenttype_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymenttypeParams _$PaymenttypeParamsFromJson(Map<String, dynamic> json) =>
    PaymenttypeParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      name: json['name'] as String?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$PaymenttypeParamsToJson(PaymenttypeParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'name': instance.name,
      'date': instance.date,
    };
