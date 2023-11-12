// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'paymentform_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymentformModel _$PaymentformModelFromJson(Map<String, dynamic> json) =>
    PaymentformModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      payment: json['payment'] as int,
      type: json['type'] as int,
      cost: json['cost'] as int,
      date: json['date'] as String,
    );

Map<String, dynamic> _$PaymentformModelToJson(PaymentformModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'payment': instance.payment,
      'type': instance.type,
      'cost': instance.cost,
      'date': instance.date,
    };
